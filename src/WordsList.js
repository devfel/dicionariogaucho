import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageStyle.css';
import bannerImage from './images/banner.png';
import apiUrl from './config';
import loadingImg from './images/loading.gif';

function WordsList() {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`${apiUrl}/words`)
            .then(response => {
                setLoading(true);
                setWords(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const filteredWords = words.filter(word =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="list-container">
            <img src={bannerImage} alt="Banner" className="banner" />
            <h1>Mateando Palavras</h1>
            <h2>O Dicionário em Inglês da Lida Campeira</h2>
            <input type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} className="search-input" />

            <table className="words-table">
                <thead>
                    <tr>
                        <th>Palavra</th>
                        <th>Significado</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (<div><img src={loadingImg} width="70px" alt="Loading" />{"Carregando Palavras."}</div>) : null}
                    {filteredWords.map(word => (
                        <tr key={word.id}>
                            <td>{word.word}</td>
                            <td>{word.meaning}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WordsList;