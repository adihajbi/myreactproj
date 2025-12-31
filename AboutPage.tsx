import React from "react";

export function AboutPage() {
    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                    <img
                        src="https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_1280.jpg"
                        alt="About us"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-12 col-md-6">
                    <h1 className="display-4 border-bottom pb-2">About BCard</h1>
                    <p className="lead mt-3">
                        BCard is the ultimate platform for professionals to create, manage, and share digital business cards.
                    </p>
                    <p>
                        We provide a simple and effective way for businesses to increase their visibility and network efficiently.
                        With BCard, you can:
                    </p>
                    <ul>
                        <li>Create stunning digital business cards in seconds.</li>
                        <li>Manage your contacts and favorites easily.</li>
                        <li>Connect with other professionals and grow your business.</li>
                    </ul>
                    <p className="text-muted mt-4">
                        Established in 2025, BCard is committed to innovation and user experience.
                    </p>
                </div>
            </div>
        </div>
    );
}