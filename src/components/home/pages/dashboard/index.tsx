import React from "react";
import { BodyProps } from "@common/types";
import { Card, Footer, NewsCarousel } from "@components";

function Component({ Icon, mobileMenu }: BodyProps) {
    return (
        <div className="select-none items-center flex flex-col w-full">
            <NewsCarousel
                Icon={Icon}
                Endpoint={"/api/news?outlet=pcgamer"}
                SiteName="PCGamer"
                Disabled={mobileMenu}
            />
            <hr className="border-b border-slate-300 dark:border-slate-600 w-2/3 self-center lg:border-none" />
            <Card SiteName="NASA" Endpoint={"/api/news?outlet=nasa"} />
            <hr className="border-b border-slate-300 dark:border-slate-600 w-2/3 self-center lg:border-none" />
            <NewsCarousel
                Icon={Icon}
                Endpoint={"/api/news?outlet=bbc"}
                SiteName="BBC"
                Disabled={mobileMenu}
            />
            <hr className="border-b border-slate-300 dark:border-slate-600 w-2/3 self-center lg:border-none" />
            <Footer Icon={Icon} />
        </div>
    );
}

export default Component;
