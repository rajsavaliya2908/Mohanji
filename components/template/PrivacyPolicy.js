import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerInner}>
          <Text style={styles.title}>Privacy Policy</Text>
          <View style={styles.bodyContentWrapper}>
            <Text style={styles.bodyParagraph}>
              Mohanji Foundation (“us”, “we”, or “our”) operates the
              https://mohanji.org/ website (the “Service”).
            </Text>

            <Text style={styles.bodyParagraph}>
              Mohanji Foundation is committed to protecting your privacy and the
              confidentiality of any personal information which you provide to
              us.
            </Text>

            <Text style={styles.bodyParagraph}>
              This Privacy Policy describes Mohanji Foundation’s policies and
              procedures on the collection, use, storage and disclosure of your
              personal information in connection with the offerings that Mohanji
              Foundation provides to you (Services). By accessing the Mohanji
              Foundation website or any of the Mohanji Foundation apps
              (together, Websites) and providing your information you indicate
              your acceptance of this Privacy Policy, as amended from time to
              time.
            </Text>

            <Text style={styles.bodyParagraph}>
              Collection of personal information:
            </Text>

            <Text style={styles.bodyParagraph}>
              You may provide personal information to Mohanji Foundation for a
              variety of reasons, including:
            </Text>

            <Text style={styles.bodyParagraph}>
              to receive information about, or to participate in, Mohanji
              Foundation or other initiatives undertaken by the Mohanji
              Foundation to receive information about or become involved in
              Mohanji Foundation activities to purchase Mohanji Foundation
              products or merchandise to make a donation to Mohanji Foundation
              for its Ashrams and/or any other initiatives undertaken by Mohanji
              Foundation that you wish to support to attend a Mohanji Foundation
              events, pilgrimages and retreats.
            </Text>

            <Text style={styles.bodyParagraph}>
              This personal information may include (without limitation) details
              such as your name, image, age, date of birth, address, postcode,
              mobile number, e-mail address, health dietary information,
              personal practices, beliefs and other biographical information. If
              you purchase products or make a donation to Mohanji Foundation,
              you may provide Mohanji Foundation with credit card details and
              other information which will allow Mohanji Foundation to process
              the transaction. Note that Mohanji Foundation does not store
              credit card information.
            </Text>

            <Text style={styles.bodyParagraph}>
              The choice of how much information you provide to Mohanji
              Foundation is yours and of course if you want to make a donation,
              or otherwise participate in Mohanji Foundation programs and
              events, Mohanji Foundation will require certain information from
              you in order to provide the services or conduct the programs and
              events.
            </Text>

            <Text style={styles.bodyParagraph}>
              How does Mohanji Foundation use your Personal Information?
            </Text>

            <Text style={styles.bodyParagraph}>
              The personal information you provide to Mohanji Foundation through
              our Websites may be used by Mohanji Foundation for the following
              purposes:
            </Text>

            <Text style={styles.bodyParagraph}>
              to provide you with information or other communications about
              Mohanji Foundation to promote Mohanji Foundation and/or its
              activities and events to keep you informed in all the initiatives
              undertaken by Mohanji Foundation to analyse statistics in relation
              to the Mohanji Foundation community
            </Text>

            <Text style={styles.bodyParagraph}>
              If you choose to provide your personal details to Mohanji
              Foundation you agree that your personal information may be
              displayed or included as set out above. You also agree that your
              personal details may accordingly be identified, recovered and
              displayed by internet search engines. This is applicable with
              regards to testimonials (audio, video and written) which gets
              published on Mohanji Foundation websites and shared via social
              media.
            </Text>

            <Text style={styles.bodyParagraph}>
              We may also collect information how the Service is accessed and
              used (“Usage Data”). This Usage Data may include information such
              as your computer’s Internet Protocol address (e.g. IP address),
              browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers and other diagnostic data.
            </Text>

            <Text style={styles.bodyParagraph}>
              How visible is my information?
            </Text>

            <Text style={styles.bodyParagraph}>
              Your information will not be made available without prior consent
              of yours. In instances where you feel your information has been
              made available without your consent, you may correct the same by
              contacting news@mohanji.org
            </Text>

            <Text style={styles.bodyParagraph}>
              In specific instances (e.g.) written testimonials, your
              information will be made available for search engines to pick up
              and display your article which is published with your written
              consent.
            </Text>

            <Text style={styles.bodyParagraph}>Communication preferences:</Text>

            <Text style={styles.bodyParagraph}>
              Where you have agreed to receive Mohanji Foundation emails,
              Mohanji Foundation may use your personal information to send you
              emails (including promotion emails) about the Mohanji Foundation
              events, associated activities and the events. You will be provided
              with an opportunity in each email communication to decline to
              receive any further communications from Mohanji Foundation. In
              addition, you can change your email or be taken off the mailing
              list, please contact news@mohanji.org
            </Text>

            <Text style={styles.bodyParagraph}>
              Disclosure of Personal Information:
            </Text>

            <Text style={styles.bodyParagraph}>
              Personal information collected by Mohanji Foundation will not be
              shared with any other organisation, event organisers or other
              third parties, except with volunteers and authorised vendors or
              suppliers who sign up “Non-Disclosure Agreement” only if the work
              demands we share the information which will be limited to the work
              they are contracted to execute.
            </Text>

            <Text style={styles.bodyParagraph}>
              We may disclose your personal information to our suppliers or
              other external third parties for analytics, website maintenance,
              for outsourcing some of the functions and services relating to the
              purposes for which your personal information may be processed by
              Mohanji Foundation, for storage and otherwise to offer and/or
              enhance our Services. When we contract external services
              providers, we may provide them with your personal information, but
              only to the extent required for them to fulfil that contract, or
              where you would reasonably expect Mohanji Foundation to disclose
              it to a third-party for a specific purpose.
            </Text>

            <Text style={styles.bodyParagraph}>
              We may also disclose your personal information to our event
              organisers managing Mohanji Foundation hosted events, retreats and
              Pilgrimages around the world. The information shall be shared only
              to an extent that is required to fulfil their contractual
              obligation for the specific purpose.
            </Text>

            <Text style={styles.bodyParagraph}>
              Transfer of Personal Information:
            </Text>

            <Text style={styles.bodyParagraph}>
              Your information, including Personal Data, may be transferred to —
              and maintained on — computers located outside of your state,
              province, country or other governmental jurisdiction where the
              data protection laws may differ than those from your jurisdiction.
            </Text>

            <Text style={styles.bodyParagraph}>
              Your consent to this Privacy Policy followed by your submission of
              such information represents your agreement to that transfer.
            </Text>

            <Text style={styles.bodyParagraph}>
              Mohanji Foundation will take all steps reasonably necessary to
              ensure that your data is treated securely and in accordance with
              this Privacy Policy and no transfer of your Personal Data will
              take place to an organization or a country unless there are
              adequate controls in place including the security of your data and
              other personal information.
            </Text>

            <Text style={styles.bodyParagraph}>
              We will not sell your personal information to other parties.
            </Text>

            <Text style={styles.bodyParagraph}>
              Mohanji Foundation will not use or disclose your personal
              information except in accordance with this Privacy Policy unless
              you have consented to the use or disclosure, or where disclosure
              is necessary to prevent injury to life or health, to investigate
              any suspected unlawful activity or where the use or disclosure is
              required or authorized by law.
            </Text>

            <Text style={styles.bodyParagraph}>
              Security storage of your information:
            </Text>

            <Text style={styles.bodyParagraph}>
              Mohanji Foundation takes reasonable steps to ensure the security
              of all information it collects, including that the information is
              protected from misuse and loss and from unauthorised access,
              modification or disclosure. For example, your personal information
              may be stored and maintained in a secure cloud-based environment,
              which can be accessed only by authorised personnel. However, as no
              data transmission over the internet or information stored on
              servers accessible through the internet can be guaranteed to be
              fully secure, we cannot ensure or warrant the security of any
              information you send to us or receive from us online.
            </Text>

            <Text style={styles.bodyParagraph}>
              Access, correction and complaints in relation to personal
              information:
            </Text>

            <Text style={styles.bodyParagraph}>
              Access to personal information You may request access to your
              personal information collected by Mohanji Foundation. Please send
              an email to news@mohanji.org and we will endeavour to respond as
              soon as possible and in any event within 30 days of receiving your
              request. There may be some legal or regulatory reason why access
              is denied or amendment refused. If this is so, we will tell you
              why. Correction of personal information If you believe any of your
              personal information held by Mohanji Foundation is not accurate,
              complete or up-to-date, Mohanji Foundation will take reasonable
              steps to correct the information. To request that your personal
              information be corrected or updated, please send an email to
              news@mohanji.org Complaints If you have a complaint about the
              handling of your personal information, please send an email to
              news@mohanji.org
            </Text>

            <Text style={styles.bodyParagraph}>Links to other websites:</Text>

            <Text style={styles.bodyParagraph}>
              Mohanji Foundation is not responsible for the privacy practices or
              content of any other website or service that is linked to a
              Website, or for the privacy practices of any third-party social
              media or other service providers that you can access through a
              Website. We encourage you to read the privacy policies of those
              websites or service providers, including, but not limited to,
              Facebook Fundraisers and Facebook donation functionality, which
              may require you to provide additional personal information.
            </Text>

            <Text style={styles.bodyParagraph}>Cookies:</Text>

            <Text style={styles.bodyParagraph}>
              What are cookies? Cookies are small text files that are stored in
              your computer’s memory and hard drive when you visit certain web
              pages. They are used to enable websites to function or to provide
              information to the owners of a website. Why do we use cookies?
              Cookies help us to provide customised services and information.
              For example, we use cookies on all our websites to collect
              anonymous traffic data and also to improve your experience with
              the Websites (e.g. to keep you logged in if you request this).
            </Text>

            <Text style={styles.bodyParagraph}>
              In broad terms, we use cookies on our Websites for the following
              purposes:
            </Text>

            <Text style={styles.bodyParagraph}>
              Analytical purposes: We use analytical cookies that allow us to
              recognise, measure and track visitors to our Websites. This helps
              us to improve and develop the way our Websites work, for example,
              by determining whether site visitors can find information easily,
              or by identifying the aspects of our Websites that are of the most
              interest to them. For these purposes, we may store the following:
            </Text>

            <Text style={styles.bodyParagraph}>
              the name of the domain from which you accessed the internet the
              date and time you accessed our Websites the advert or internet
              address of the website from which you linked directly to our
              Websites the pages you accessed while visiting our Websites the
              device from which you accessed our Websites the location from
              which you accessed our Websites
            </Text>

            <Text style={styles.bodyParagraph}>
              Usage preferences: Some of the cookies on our Websites are
              activated when visitors to our sites make a choice about their
              usage of the site. Our Websites then ‘remember’ the settings
              preferences of the user concerned. This allows us to tailor
              aspects of our sites to the individual user. Session management:
              The software that runs our Websites uses cookies for technical
              purposes needed by the internal workings of our servers and
              application. For instance, we use cookies to keep track of
              information about a user’s session and determine which options or
              pages to display in order for the site to function. Functional
              purposes: Functional purpose cookies store information that is
              needed by our applications to process and operate. For example,
              where requests within an application involve multiple stages,
              cookies are used to store the information from each stage
              temporarily, in order to facilitate completion of the overall
              request.
            </Text>

            <Text style={styles.bodyParagraph}>
              Your cookie preferences To make full use of our Websites, your
              computer or mobile device will need to accept cookies, as our
              sites will not function properly without them. In addition,
              cookies are required in order to provide you with personalised
              features on our websites.
            </Text>

            <Text style={styles.bodyParagraph}>
              Third-party cookies When you visit our Websites, you may receive
              cookies that are set by third parties. For example, you may
              receive a cookie set by Google. These cookies are used for the
              purposes described in the “Why Do We Use Cookies?” section of this
              policy. We do not control the setting of these third-party
              cookies, so we suggest you might wish to check the third-party
              websites for more information about their use of cookies and how
              to manage them.
            </Text>

            <Text style={styles.bodyParagraph}>
              Amending cookie preferences If you wish to remove cookies set by
              our Websites from your browser in the future, you may delete them.
              The instructions for removing cookies from your computer or mobile
              device depend on the operating system and web browser you use.
              Please note, however, that withdrawing your agreement to the use
              of cookies on our sites will impair the functionality of the
              sites.
            </Text>

            <Text style={styles.bodyParagraph}>
              Changes to this Privacy Policy:
            </Text>

            <Text style={styles.bodyParagraph}>
              This privacy policy may change from time to time particularly as
              new rules, regulations and industry codes are introduced. Any
              changes to the Privacy Policy will be posted on our Website. If we
              consider that the changes are material we will notify you by
              email.
            </Text>
          </View>
        </View>
        <View style={{ height: 110 }} />
      </ScrollView>
    </ImageBackground>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
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
  },
  headerCardWrapper: {
    marginTop: 10,
    alignSelf: "center",
  },
  headerCard: {
    width: 90,
    height: 90,
    backgroundColor: "#F1EBE4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCardImage: {
    borderRadius: 15,
  },
  headerCardText: {
    width: 90,
    marginTop: 10,
    alignItems: "center",
  },
  colorTitle: {
    fontSize: 16,
  },
  title: {
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  bodyContentWrapper: {},
  bodyParagraph: {
    width: "100%",
    marginBottom: 20,
    // float: "left",
  },
  buttonsWrapper: {
    marginTop: 30,
  },
  buttonEachHolder: {
    width: "100%",
    marginBottom: 25,
  },
  button: {
    width: "100%",
    backgroundColor: "#66458F",
    borderColor: "#66458F",
    fontWeight: "600",
    borderWidth: 2,
    borderRadius: 50,
  },
});
