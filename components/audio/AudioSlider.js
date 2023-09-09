import React, { PureComponent, useState } from "react";
import {
  TouchableOpacity,
  Animated,
  PanResponder,
  View,
  Easing,
  Image,
  Text,
} from "react-native";
import { Audio } from "expo-av";
import sleep from "./sleep";
import DigitalTimeString from "./DigitalTimeString";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

const durationMillisecondsFunc = (durationMinutes, durationSeconds) => {
  const durationMilliseconds =
    parseInt(durationMinutes) * 60000 + parseInt(durationSeconds) * 1000;
  return durationMilliseconds;
};

export default class AudioSlider extends PureComponent {
  constructor(props) {
    super(props);
    const durationMilliseconds = durationMillisecondsFunc(
      this.props.durationMinutes,
      this.props.durationSeconds
    );

    this.state = {
      playing: false,
      currentTime: 0, // miliseconds; value interpolated by animation.
      loaded: false,
      durationMilliseconds: durationMilliseconds,
      duration: 0,
      trackLayout: {},
      dotOffset: new Animated.ValueXY(),
      xDotOffsetAtAnimationStart: 0,
    };

    // Important:
    // this.state.dotOffset.x is the actual offset
    // this.state.dotOffset.x._value is the offset from the point where the animation started
    // However, since this.state.dotOffset.x is an object and not a value, it is difficult
    // to compare it with other numbers. Therefore, the const currentOffsetX is used.
    // To print all attributes of the object see https://stackoverflow.com/questions/9209747/printing-all-the-hidden-properties-of-an-object
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: async (e, gestureState) => {
        if (this.state.playing) {
          await this.pause();
        }
        await this.setState({
          xDotOffsetAtAnimationStart: this.state.dotOffset.x._value,
        });
        await this.state.dotOffset.setOffset({
          x: this.state.dotOffset.x._value,
        });
        await this.state.dotOffset.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        Animated.event([
          null,
          { dx: this.state.dotOffset.x, dy: this.state.dotOffset.y },
        ])(e, gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: async (evt, gestureState) => {
        // Another component has become the responder, so this gesture is cancelled.

        const currentOffsetX =
          this.state.xDotOffsetAtAnimationStart + this.state.dotOffset.x._value;
        if (
          currentOffsetX < 0 ||
          currentOffsetX > this.state.trackLayout.width
        ) {
          await this.state.dotOffset.setValue({
            x: -this.state.xDotOffsetAtAnimationStart,
            y: 0,
          });
        }
        await this.state.dotOffset.flattenOffset();
        await this.mapAudioToCurrentTime();
      },
      onPanResponderRelease: async (e, { vx }) => {
        const currentOffsetX =
          this.state.xDotOffsetAtAnimationStart + this.state.dotOffset.x._value;
        if (
          currentOffsetX < 0 ||
          currentOffsetX > this.state.trackLayout.width
        ) {
          await this.state.dotOffset.setValue({
            x: -this.state.xDotOffsetAtAnimationStart,
            y: 0,
          });
        }
        await this.state.dotOffset.flattenOffset();
        await this.mapAudioToCurrentTime();
      },
    });
  }

  mapAudioToCurrentTime = async () => {
    await this.soundObject.setPositionAsync(this.state.currentTime);
  };

  onPressPlayPause = async () => {

    if (this.state.playing) {
      await this.pause();
        // Activate keep awake when user stops playing audio
        await deactivateKeepAwake();
      return;
    }

    // Activate keep awake when user starts playing audio
    await activateKeepAwakeAsync();
    await this.play();
  };

  play = async () => {
    await this.soundObject.playAsync();
    this.setState({ playing: true }); // This is for the play-button to go to play
    this.startMovingDot();
    this.props.onIsPlaying(true);
  };

  pause = async () => {
      await this.soundObject.pauseAsync();
    this.setState({ playing: false }); // This is for the play-button to go to pause
    Animated.timing(this.state.dotOffset).stop(); // Will also call animationPausedOrStopped()
      this.props.onIsPlaying(false);
  };

  startMovingDot = async () => {
    const status = await this.soundObject.getStatusAsync();
    const durationLeft =
      this.state.durationMilliseconds - status["positionMillis"];

    Animated.timing(this.state.dotOffset, {
      toValue: { x: this.state.trackLayout.width, y: 0 },
      duration: durationLeft,
      easing: Easing.linear,
    }).start(() => this.animationPausedOrStopped());
  };

  animationPausedOrStopped = async () => {
    if (!this.state.playing) {
      // Audio has been paused
      return;
    }
    // Animation-duration is over (reset Animation and Audio):
    await sleep(200); // In case animation has finished, but audio has not
    this.setState({ playing: false });
    await this.soundObject.pauseAsync();
    await this.state.dotOffset.setValue({ x: 0, y: 0 });
    // this.state.dotOffset.setValue(0);
    await this.soundObject.setPositionAsync(0);
  };

  measureTrack = (event) => {
    this.setState({ trackLayout: event.nativeEvent.layout }); // {x, y, width, height}
  };

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: 1,
      interruptionModeAndroid: 1,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });
    this.soundObject = new Audio.Sound();
    if (this.soundObject) {
      await this.soundObject.loadAsync({ uri: this.props.audioUrl });

      const status = await this.soundObject.getStatusAsync();

      this.setState({ duration: this.state.durationMilliseconds });

      this.setState({ loaded: true });

      // This requires measureTrack to have been called.
      this.state.dotOffset.addListener(() => {
        let animatedCurrentTime = this.state.dotOffset.x
          .interpolate({
            inputRange: [0, this.state.trackLayout.width],
            outputRange: [0, this.state.duration],
            extrapolate: "clamp",
          })
          .__getValue();
        this.setState({ currentTime: animatedCurrentTime });
      });
    }
  }

  async componentWillUnmount() {
    await this.soundObject.unloadAsync();
    this.state.dotOffset.removeAllListeners();
  }

  render() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
            paddingLeft: 8,
            paddingRight: 8,
            height: 110,
          }}
        >
          {!this.state.loaded ? (
            <View
              style={{
                height: 80,
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                }}
                source={require("../../assets/images/loading4.gif")}
              />
            </View>
          ) : (
            <View
              style={{
                width: 100,
                height: 100,
                flex: 1,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              {this.state.playing ? (
                <Icon
                  name="pause-circle"
                  size={80}
                  color="#66458F"
                  onPress={this.onPressPlayPause}
                />
              ) : (
                <Icon
                  name="play-circle"
                  size={80}
                  color="#66458F"
                  onPress={this.onPressPlayPause}
                />
              )}
            </View>
          )}
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 8,
            paddingRight: 8,
            height: 35,
          }}
        >
          <Animated.View
            onLayout={this.measureTrack}
            style={{
              flex: 8,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              height: TRACK_SIZE,
              borderRadius: TRACK_SIZE / 2,
              backgroundColor: "#7a7a7a",
            }}
          >
            <Animated.View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: -((THUMB_SIZE * 4) / 2),
                width: THUMB_SIZE * 4,
                height: THUMB_SIZE * 4,
                transform: [
                  {
                    translateX: this.state.dotOffset.x.interpolate({
                      inputRange: [
                        0,
                        this.state.trackLayout.width != undefined
                          ? this.state.trackLayout.width
                          : 1,
                      ],
                      outputRange: [
                        0,
                        this.state.trackLayout.width != undefined
                          ? this.state.trackLayout.width
                          : 1,
                      ],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
              {...this._panResponder.panHandlers}
            >
              <View
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: THUMB_SIZE / 2,
                  backgroundColor: "#66458F",
                }}
              ></View>
            </Animated.View>
          </Animated.View>
        </View>

        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DigitalTimeString time={this.state.currentTime} />
          <DigitalTimeString time={this.state.duration} />
        </View>
      </View>
    );
  }
}
