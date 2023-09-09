import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 5,
  },
  containerInner: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 0,
  },
  modalInner: {
    flexDirection: "row",
  },
  modalInnerCenter: {
    width: "100%",
    padding: 30,
    alignItems: "center",
    // float: "left",
  },
  modalInnerCenter2: {
    width: "100%",
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    alignItems: "center",
    // float: "left",
  },
  modalInnerCenter3: {
    width: "100%",
    paddingTop: 30,
    paddingBottom: 5,
    alignItems: "center",
    // float: "left",
  },
  modalInnerCenter4: {
    width: "100%",
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    alignItems: "center",
    // float: "left",
  },
  modalInnerCenter5: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    // float: "left",
  },
  modalInnterCenter6: {
    width: "100%",
    paddingTop: 0,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    alignItems: "center",
    // float: "left",
  },
  modalInnerPadding: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 50,
    paddingBottom: 10,
  },
  modalInnerPadding2: {
    paddingTop: 30,
    paddingBottom: 0,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 0,
  },
  modalSubTitle: {
    textAlign: "center",
    color: "#7E7E7E",
    fontSize: 18,
    paddingTop: 2,
    paddingBottom: 0,
  },
  saveAsPresetButton: {
    marginTop: 0,
    textAlign: "center",
    color: "#7E7E7E",
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 0,
  },
  wheelEach: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    fontSize: 18,
  },
  bottomDivider: {
    height: 100,
  },
  timerRowFirst: {
    marginTop: 25,
    marginBottom: 20,
    paddingTop: 3,
    paddingLeft: 30,
    paddingRight: 15,
    paddingBottom: 3,
    flexDirection: "row",
    backgroundColor: "#F7F2ED",
    borderRadius: 50,
  },
  timerRowAdditional: {
    marginBottom: 10,
    paddingTop: 3,
    paddingLeft: 30,
    paddingRight: 15,
    paddingBottom: 3,
    flexDirection: "row",
    backgroundColor: "#E2D7C8",
    borderRadius: 50,
  },
  timerRowAdditionalSquaresWrapper: {
    height: 160,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  timerRowAdditionalSquare: {
    width: "30%",
    height: 70,
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#E2D7C8",
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  timerRowAdditionalSquareMiddle: {
    width: "30%",
    height: 70,
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#E2D7C8",
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  timerRowLeft: {
    width: "50%",
    textAlign: "left",
    marginTop: 7,
    fontSize: 18,
  },
  timerRowRight: {
    width: "50%",
    textAlign: "right",
    fontSize: 16,
  },
  timerRowTop: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    lineHeight: 20,
  },
  timerRowBottom: {
    width: "100%",
    marginTop: 15,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  selectStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "green",
    paddingRight: 30,
  },
  startStopWrapper: {
    marginTop: 0,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  startStopButton: {
    width: 80,
    height: 80,
    marginTop: -40,
    paddingTop: 20,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#E2D7C8",
    color: "#555",
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  playPauseButtonWrapper: {
    marginTop: 0,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  timerCountDescdownDisplay: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 75,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    // float: "left",
  },
  backArrow: {
    width: 22,
    resizeMode: "contain",
    top: -8,
  },
});
