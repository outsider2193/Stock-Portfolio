import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
    const [portfolio, setPortfolio] = useState(null);

    let userId = null;
    let token = localStorage.getItem("token");

    if (token && typeof token === "string") {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.id;
        } catch (err) {
            console.error("Invalid token format", err);
        }
    } else {
        console.warn("No token found in localStorage or token is not a string.");
    }


    const fetchPortfolio = async () => {
        try {
            if (!userId) return;
            const res = await axios.get(`/portfolio/fetchportfolio/${userId}`);
            setPortfolio(res.data.data);
        } catch (err) {
            console.error("Failed to fetch portfolio", err);
            setPortfolio(null);
        }
    };

    const calculatePortfolioValues = () => {
        if (!portfolio || !portfolio.stocks) return {
            totalValue: 0,
            score: 0,
            activeHoldings: 0,
        };

        let totalValue = portfolio.cash;
        let activeHoldings = 0;

        portfolio.stocks.forEach((stock) => {
            totalValue += stock.averagePrice * stock.quantity;
            if (stock.quantity > 0) activeHoldings++;
        });

        const score = Math.round((activeHoldings / (portfolio.stocks.length || 1)) * 100);

        return { totalValue, score, activeHoldings };
    };

    useEffect(() => {
        if (userId) fetchPortfolio();
    }, [userId]);

    return (
        <PortfolioContext.Provider
            value={{ portfolio, fetchPortfolio, calculatePortfolioValues }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);
