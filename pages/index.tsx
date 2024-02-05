import { Product } from "components/molecules/Product";
import { Screen, ScreenFlexible } from "components/molecules/Screen";
import { AboutMe } from "components/organisms/About/Me";
import { AboutSite } from "components/organisms/About/Site";
import { Header } from "components/organisms/Header";
import { Contact } from "components/organisms/Contact";
import { SectionTitle } from "components/atoms/SectionTitle";
import { ScrollUp } from "components/molecules/ScrollUp";
import { Column } from "components/atoms/Column";
import { Columns } from "components/atoms/Columns";
import { Button } from "components/atoms/Button";
import { Footer } from "components/organisms/Footer";

export default function Index() {
  return (
    <div className="container">
      <Header />
      <main>
        <section>
          <SectionTitle id="works">Works</SectionTitle>
          <Screen tag="section">
            <Product
              screenshot="/images/gamma-ss.png"
              name="Gamma"
              desc="Gamma is pnut.io client for Android."
              applicationCategory="SNS Viewer"
              operatingSystem="Android 6+"
              icon="/images/gamma.png"
              id="gamma"
              itemType="http://schema.org/MobileApplication"
              url="https://play.google.com/store/apps/details?id=net.unsweets.gamma"
              imgOption={{
                width: 794,
                height: 1209,
              }}
            />
          </Screen>
          <Screen tag="section">
            <Product
              reverse
              screenshot="/images/beta-ss.png"
              name="Beta"
              desc="Web client for pnut.io."
              applicationCategory="SNS Viewer"
              operatingSystem="Any"
              icon="/images/beta.png"
              id="gamma"
              itemType="http://schema.org/WebApplication"
              url="https://beta.pnut.io/"
              imgOption={{
                width: 985,
                height: 911,
                style: {
                  border: "1px solid rgba(0, 0, 0, .1)",
                },
              }}
            />
          </Screen>
          <div className="text-center">
            <Button href="https://github.com/sunya9" icon="GitHub" external>
              View more projects on GitHub
            </Button>
          </div>
        </section>
        <Screen tag="section">
          <SectionTitle id="about">About</SectionTitle>
          <ScreenFlexible centering>
            <Columns>
              <Column>
                <AboutSite />
              </Column>
              <Column>
                <AboutMe />
              </Column>
            </Columns>
          </ScreenFlexible>
        </Screen>
        <Screen tag="section">
          <SectionTitle id="contact">Contact</SectionTitle>
          <ScreenFlexible centering>
            <Contact />
          </ScreenFlexible>
        </Screen>
      </main>
      <ScrollUp />
      <Footer />
    </div>
  );
}
