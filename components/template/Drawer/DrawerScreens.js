import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import CustomDrawer from "./CustomDrawer";
import NavBarBottom from "../NavBarBottom";

const Drawer = createDrawerNavigator();

const { width } = Dimensions.get("window");

const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      initialRouteName="NavBarBottom"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: true,
        drawerType: "front",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="NavBarBottom"
        component={NavBarBottom}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerScreens;
