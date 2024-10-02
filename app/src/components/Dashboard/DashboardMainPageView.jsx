'use client'
import { useSelector } from "react-redux";
import Overview from "@/app/(dashboard)/dashboard/Overview/Overview";

import Container from "@/app/src/components/global/Container";
import Section from "@/app/src/components/global/Section";
import withDynamicFavicon from "@/app/src/hoc/withDynamicFavicon";

const Page = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user?.role === "admin" ? (
        <div className="flex">
          <div className="flex flex-col min-h-screen flex-grow overflow-x-hidden max-w-full">
            <main>
              <Section className="py-6 mt-20">
                <Container>
                  <div className="">
                    <Overview />
                  </div>
                </Container>
              </Section>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withDynamicFavicon(Page);
