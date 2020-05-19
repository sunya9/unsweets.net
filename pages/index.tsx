import React from "react";
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
    <>
      <div className="container">
        <Header />
        <main>
          <section>
            <SectionTitle id="works">Works</SectionTitle>
            <Screen>
              <section>
                <Product
                  screenshot={require("../images/gamma-ss.png")}
                  name="Gamma"
                  desc="Gamma is pnut.io client for Android."
                  applicationCategory="SNS Viewer"
                  operatingSystem="Android 6+"
                  icon={require("../images/gamma.png")}
                  id="gamma"
                  itemType="http://schema.org/MobileApplication"
                  url="https://play.google.com/store/apps/details?id=net.unsweets.gamma"
                />
              </section>
            </Screen>
            <Screen>
              <section>
                <Product
                  reverse
                  screenshot={require("../images/beta-ss.png")}
                  name="Beta"
                  desc="Web client for pnut.io."
                  applicationCategory="SNS Viewer"
                  operatingSystem="Any"
                  icon={require("../images/beta.png")}
                  id="gamma"
                  itemType="http://schema.org/WebApplication"
                  url="https://beta.pnut.io/"
                  imgStyle={{
                    border: "1px solid rgba(0, 0, 0, .1)",
                  }}
                />
              </section>
            </Screen>
            <div className="text-center">
              <Button<"a">
                tag="a"
                href="https://github.com/sunya9"
                icon="GitHub"
              >
                View more projects
              </Button>
            </div>
          </section>
          <section>
            <Screen>
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
          </section>
          <section>
            <Screen>
              <SectionTitle id="contact">Contact</SectionTitle>
              <ScreenFlexible centering>
                <Contact />
              </ScreenFlexible>
            </Screen>
          </section>
        </main>
        <ScrollUp />
        <Footer />
      </div>
    </>
  );
}
