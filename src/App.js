import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SingleMovie from "./components/SingleMovie";
import Error from "./components/Error";

import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<SingleMovie />} />
        <Route path="/popular" element={<Home title="popular" />} />
        <Route path="/toprated" element={<Home title="top_rated" />} />
        <Route path="/upcoming" element={<Home title="upcoming" />} />
        <Route path="/nowplaying" element={<Home title="now_playing" />} />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Search />} />
      </Routes>
    </div>
  );
}
export default App;
