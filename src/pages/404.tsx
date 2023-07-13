import Link from "next/link";
import * as React from "react";

const NotFoundPage = () => {
    return (
        <main>
            <section className="bg-white">
                <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-stone-800">
                    <h1 className="mt-8 text-4xl md:text-6xl">
                        Page Not Found
                    </h1>
                    <Link href="/" className="mt-4 md:text-lg">
                        Back to Home
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default NotFoundPage;
