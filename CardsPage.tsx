import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { getCards, deleteCard } from "../services/cardsService"; 
import { toast } from "react-toastify";
import { Card as CardInterface } from "../interfaces/Card";

export function CardsPage() {
    const [cards, setCards] = useState<CardInterface[]>([]);

    useEffect(() => {
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCard(id)
                .then(() => {
                    toast.success("Card deleted successfully");
                    setCards(cards.filter((card) => card._id !== id));
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Error deleting card");
                });
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4 mb-4">Cards Page</h1>
            <p className="lead mb-5">Here you can find business cards from all categories</p>

            {cards.length === 0 && <p>No cards found...</p>}

            <div className="row">
                {cards.map((card) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={card._id}>
                        <Card card={card} onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
}