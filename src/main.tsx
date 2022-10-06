import { ApolloProvider } from "@apollo/client";
import { MoviesProvider } from "@contexts/MoviesContext";
import { Dashboard, Home, Movies, SelectedMovie } from "@pages";
import { client } from "@services/graphql/config";
import { AnimatePresence } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MoviesProvider>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<SelectedMovie />} />
            </Routes>
          </AnimatePresence>
        </MoviesProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
