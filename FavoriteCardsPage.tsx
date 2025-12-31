import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { getCards, deleteCard } from "../services/cardsService";
import { getUser } from "../services/userService";
import { toast } from "react-toastify";
import { Card as CardInterface } from "../interfaces/Card";

export function FavoriteCardsPage() {
    const [cards, setCards] = useState<CardInterface[]>([]);

    useEffect(() => {
        const user: any = getUser();
        getCards()
            .then((res) => {
                const favCards = res.data.filter((card: any) =>
                    user && card.likes?.includes(user._id)
                );
                setCards(favCards);
            })
            .catch((err) => toast.error("Error loading favorite cards"));
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCard(id)
                .then(() => {
                    toast.success("Card deleted successfully");
                    setCards(cards.filter((card) => card._id !== id));
                })
                .catch(() => toast.error("Error deleting card"));
        }
    };


    const handleUnfav = (id: string) => {
        setCards(cards.filter((card) => card._id !== id));
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4">Favorite Cards</h1>
            <p className="lead">Your personal collection of business cards</p>

            {cards.length === 0 && <p>No favorite cards yet...</p>}

            <div className="row">
                {cards.map((card) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={card._id}>

                        <Card card={card} onDelete={handleDelete} onUnfav={handleUnfav} />
                    </div>
                ))}
            </div>
        </div>
    );
}