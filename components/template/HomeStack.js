import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from "../../store";
import HomeScreen from "./HomeScreen";
import VideoCard from "../videos/VideoCard";
import VideoCardPranayama from "../videos/VideoCardPranayama";
import Courses from "../courses/CoursesHome";
import CoursesEach from "../courses/CoursesEach";
import Practices from "../practices/PracticesHome";
import PracticesEach from "../practices/PracticesEach";
import PodcastsEach from "../podcasts/PodcastsEach";
import PodcastsAll from "../podcasts/PodcastsAll";
import Meditations from "../practices/MeditationsHome";
import VideosAll from "../videos/VideosAll";
import Timer from "../timer/Timer";
import Presets from "../timer/Presets";
import Donate from "../donate/Donate";
import UserDashboard from "../auth/UserDashboard";
import UpdatePassword from "../auth/UpdatePassword";
import CommunicationPreferences from "../auth/CommunicationPreferences";
import KriyaHome from "../kriya/KriyaHome";
import WisdomHome from "../wisdom/WisdomHome";
import BreathingHome from "../breathing/BreathingHome";
import VerticalBreathing from "../breathing/VerticalBreathing";
import Test from "../test/Test";
import SearchResults from "./SearchResults";
import { useSelector } from "react-redux";
import ProgressWeekly from "../progress/ProgressWeekly";
import NotificationsPreferences from "../notifications/NotificationsPreferences";
import UserAccount from "../auth/UserAccount";
import PrivacyPolicy from "./PrivacyPolicy";
import WhoIsMohanji from "./WhoIsMohanji";
import ContemplationAssistantHome from "../contemplation_assistant/ComtemplationAssistantHome";
import Journal from "../journal/Journal";
import ProgressTab from "./ProgressTab";
import ProgressWeek from "../progress/ProgressWeek";
import ProgressMonth from "../progress/ProgressMonth";
import ProgressYear from "../progress/ProgressYear";
import ProgressAllTime from "../progress/ProgressAllTime";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const userAuth = useSelector((state) => state.userAuth);
  // Screens object logged in
  const loggedInScreens = [
    { name: "ProgressWeekly", component: ProgressWeekly },
    { name: "ProgressTab", component: ProgressTab },
    { name: "ProgressWeek", component: ProgressWeek },
    { name: "ProgressMonth", component: ProgressMonth },
    { name: "ProgressYear", component: ProgressYear },
    { name: "ProgressAllTime", component: ProgressAllTime },
    { name: "NotificationsPreferences", component: NotificationsPreferences },
    { name: "UserAccount", component: UserAccount },
    { name: "Video", component: VideoCard },
    { name: "VideoCardPranayama", component: VideoCardPranayama },
    { name: "Courses", component: Courses },
    { name: "CoursesEach", component: CoursesEach },
    { name: "Practices", component: Practices },
    { name: "PracticesEach", component: PracticesEach },
    { name: "PodcastsEach", component: PodcastsEach },
    { name: "PodcastsAll", component: PodcastsAll },
    { name: "Meditations", component: Meditations },
    { name: "VideosAll", component: VideosAll },
    { name: "Timer", component: Timer },
    { name: "Presets", component: Presets },
    { name: "Donate", component: Donate },
    { name: "UserDashboard", component: UserDashboard },
    { name: "UpdatePassword", component: UpdatePassword },
    { name: "CommunicationPreferences", component: CommunicationPreferences },
    { name: "KriyaHome", component: KriyaHome },
    { name: "WisdomHome", component: WisdomHome },
    { name: "BreathingHome", component: BreathingHome },
    { name: "VerticalBreathing", component: VerticalBreathing },
    { name: "Test", component: Test },
    { name: "SearchResults", component: SearchResults },
    { name: "PrivacyPolicy", component: PrivacyPolicy },
    { name: "WhoIsMohanji", component: WhoIsMohanji },
    { name: "ContemplationAssistantHome", component: ContemplationAssistantHome },
    { name: "Journal", component: Journal }
  ];
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      {loggedInScreens.map(({ name, component }) => (
        <Stack.Screen name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
