import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCard } from "../services/cardsService"; 
import { Card as CardInterface } from "../interfaces/Card";

export function CardDetailsPage() {
    const { id } = useParams();
    const [card, setCard] = useState<CardInterface | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        getCard(id)
            .then((res) => setCard(res.data))
            .catch((err) => {
                console.log(err);
                navigate("/"); 
            });
    }, [id, navigate]);

    if (!card) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img
                            src={card.image.url}
                            className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                            alt={card.image.alt}
                        />
                    </div>
                    <div className="col-md-6 p-4">
                        <h1 className="card-title display-5 text-primary">{card.title}</h1>
                        <h3 className="text-muted mb-4">{card.subtitle}</h3>
                        <p className="card-text fs-5">{card.description}</p>

                        <hr />

                        <ul className="list-unstyled">
                            <li className="mb-2"><i className="bi bi-telephone-fill me-2"></i> {card.phone}</li>
                            <li className="mb-2"><i className="bi bi-envelope-fill me-2"></i> {card.email}</li>
                            <li className="mb-2"><i className="bi bi-globe me-2"></i> {card.web || "No website"}</li>
                            <li className="mb-2">
                                <i className="bi bi-geo-alt-fill me-2"></i>
                                {card.address.street} {card.address.houseNumber}, {card.address.city}
                            </li>
                        </ul>

                        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </div>

            <div className="mt-4 mb-5">
                <h3>Location</h3>
                <div className="ratio ratio-16x9 border shadow-sm">
                    <iframe
                        title="map"
                        src={`https://maps.google.com/maps?q=${card.address.city},${card.address.street}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}