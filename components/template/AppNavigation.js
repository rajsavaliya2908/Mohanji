import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from "./AuthStack";
import NavBarBottom from "./NavBarBottom";
import DrawerScreens from "./Drawer/DrawerScreens";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      {/* <Stack.Screen name="NavBarBottom" component={NavBarBottom} /> */}
      <Stack.Screen name="NavBarBottom" component={DrawerScreens} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
