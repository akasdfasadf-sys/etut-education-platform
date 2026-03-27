import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TemalarScreen from '../screens/TemalarScreen';
import TestlerScreen from '../screens/TestlerScreen';
import LoginScreen from '../screens/LoginScreen';
import VideoScreen from '../screens/VideoScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import FakultetlerScreen from '../screens/FakultetlerScreen';
import SubjectDetailScreen from '../screens/SubjectDetailScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Temalar" component={TemalarScreen} />
      <Tab.Screen name="Testler" component={TestlerScreen} />
      <Tab.Screen name="Fakultetler" component={FakultetlerScreen} />
      <Tab.Screen name="VideoSapaklar" component={VideoScreen} />
      <Tab.Screen name="BizBarada" component={AboutScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} options={{ title: 'Tema' }} />
        <Stack.Screen name="Test" component={TestScreen} options={{ title: 'Test' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
