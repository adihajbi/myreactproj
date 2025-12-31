import { useEffect, useState } from "react";
import { Card as CardInterface } from "../interfaces/Card";
import { getUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLike } from "../services/cardsService";

interface CardProps {
    card: CardInterface;
    onDelete: (id: string) => void;
    onUnfav?: (id: string) => void; 
}

export function Card({ card, onDelete, onUnfav }: CardProps) {
    const user: any = getUser();
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && card.likes?.includes(user._id)) {
            setIsLiked(true);
        }
    }, [user, card.likes]);

    const handleLike = async () => {
        try {
            await setLike(card._id as string);

      
            if (isLiked && onUnfav) {
                onUnfav(card._id as string); 
                toast.success("Card removed from favorites");
                return; 
            }

            setIsLiked(!isLiked);

            if (!isLiked) toast.success("Card liked!");
            else toast.success("Card unliked");

        } catch (err) {
            toast.error("Error liking card");
        }
    };

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={card.image.url}
                className="card-img-top"
                alt={card.image.alt}
                style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => navigate(`/card/${card._id}`)}
            />

            <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text text-muted">{card.subtitle}</p>
                <hr />
                <p className="card-text"><strong>Phone:</strong> {card.phone}</p>
                <p className="card-text"><strong>Address:</strong> {card.address.street} {card.address.houseNumber}, {card.address.city}</p>
                <p className="card-text"><strong>Card Number:</strong> {card.bizNumber}</p>

                <div className="d-flex justify-content-between mt-3 align-items-center">
                    <div>
                        {(user?.isAdmin || (user?.isBusiness && user?._id === card.user_id)) && (
                            <>
                                <button
                                    className="btn btn-link p-0 me-3 text-danger"
                                    onClick={() => onDelete(card._id as string)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                                <Link to={`/edit/${card._id}`} className="text-dark">
                                    <i className="bi bi-pencil"></i>
                                </Link>
                            </>
                        )}
                    </div>

                    <div>
                        <a href={`tel:${card.phone}`} className="text-dark me-3"><i className="bi bi-telephone"></i></a>

                        {user && (
                            <i
                                className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"} text-danger`}
                                style={{ cursor: "pointer" }}
                                onClick={handleLike}
                            ></i>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}