import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageStyle.css';
import bannerImage from './images/banner.png';
import apiUrl from './config';

function WordsList() {
    const [words, setWords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`${apiUrl}/words`)
            .then(response => {
                setWords(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filteredWords = words.filter(word =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="list-container">
            <img src={bannerImage} alt="Banner" className="banner" />
            <h1>O Dicionário Gaúcho</h1>
            <h2>Gírias, palavras e o dialéto gaúcho - O gauchês raiz</h2>
            <input type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} className="search-input" />

            <table className="words-table">
                <thead>
                    <tr>
                        <th>Palavra</th>
                        <th>Significado</th>
                    </tr>
                </thead>
                <tbody>
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