import React from "react";
import { GlobeDemo } from "../UI/GlobeAnimation/World";

export default function Section8() {
    return (
        <section className="relative w-full bg-black pb-20 pt-40 z-40 px-12 md:px-12 lg:px-24">
            <div className="flex gap-3 w-full">
                <div className="w-2/3">
                    <GlobeDemo />
                </div>
                <div className="w-1/3 pr-20">
                    <div>
                        <h2 className="text-white text-5xl tracking-tighter font-normal mb-10">
                            Built for Pakistan. Delivering to the world.
                        </h2>
                    </div>
                    <div>
                        <span className="text-gray-400">
                            From remote mountain towns to city marketplaces, Octane unites Pakistan’s sellers with 5.4 billion shoppers across the globe .we enable fast, and reliable delivery to 150+  countries — helping you grow beyond borders. Wherever business takes you, Octane gets you there.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}