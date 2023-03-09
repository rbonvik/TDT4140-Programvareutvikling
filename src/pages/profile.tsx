import { SettingsIcon } from "@chakra-ui/icons";
import {
  Flex,
  SimpleGrid,
  Grid,
  Box,
  Text,
  Image,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import BgSignUp from "assets/img/BgSignUp.png";
import { ContactUs, Logo, ProfileInformation } from "components/atoms";
import {
  ProjectPanel,
  DefaultHeader,
  SidebarButtons,
  ProfileReviews,
} from "components/molecules";
import { collection, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { queryFilter } from "utils/queryFilter";
// firebase
import { auth, db } from "../firebase/clientApp";

export default function Index() {
  // Logic to set user state
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user?.email);
    });
  }, []);

  return (
    <Flex pt="5px">
      {/* SIDEPANEL */}
      <Flex
        minH={"100vh"}
        w="270px"
        flexDirection="column"
        pt="30px"
        alignItems="center"
        gap="20px"
      >
        <Flex
          mx="25px"
          pb="15px"
          mb="5px"
          w="80%"
          borderBottom="1px"
          borderColor="blackAlpha.200"
          justifyContent="center"
        >
          <Logo h="40px" />
        </Flex>
        <SidebarButtons
          size={"medium"}
          gapSize={"10px"}
          width={"100%"}
          type={user ? "logged_in" : "logged_out"}
          selected="profile"
        />
        <ContactUs />
      </Flex>

      <Flex w="80%" flexWrap="wrap">
        <DefaultHeader
          profilePic={user ? user.photoURL : undefined}
          type="profile"
          img_src={`url(${BgSignUp.src})`}
          title={user ? `Hello ${user.displayName}` : "You are logged out"}
        />

        <Flex mt="70px" w="full" justifyContent="space-between">
          {/* <Card width="32%" minH="250px" borderRadius="2xl">
            <CardHeader>
              <Text fontWeight="bold" fontSize='lg' >Profile Information</Text>
              <Text>Your name: <i>{user?.displayName || "Name is undefined"}</i></Text>
              <Text>Your email: <i>{user?.email || "Email is undefined"}</i></Text>
            </CardHeader>
          </Card> */}
          <ProfileInformation />

          <Card width="32%" borderRadius="2xl">
            <CardHeader>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize='lg'>Favorite trips</Text>
              </Flex>
            </CardHeader>
          </Card>

          {/*<Card width="32%" borderRadius="2xl">
            <CardHeader>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize='lg'>Reviews</Text>
              </Flex>
            </CardHeader>
        </Card>*/}
        <ProfileReviews 
        userNames={["User1","User2","User3","User4"]} 
        reviews={[1,2,3,4]}
        description={["Description1","Description2","Description3","Description4"]}
        profileURL={BgSignUp.src}
        />
        </Flex>

        <Flex mt="20px" flexDirection="column" gap="20px" w="full">
          {user && (
            <ProjectPanel title="My Trips" tripQuery={query(collection(db, "trips"), where("userEmailAddress", "==", user?.email), limit(3))} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
