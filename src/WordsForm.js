import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageStyle.css';
import apiUrl from './config';


function WordsForm() {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [words, setWords] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWords = words.filter(word =>
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchWords = () => {
        axios.get(`${apiUrl}/words`)
            .then(response => {
                setWords(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Fetch words when the component mounts
    useEffect(() => {
        fetchWords();
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        // Determine whether we're updating or creating, then send the appropriate request
        const request = updateId
            ? axios.put(`${apiUrl}/words/${updateId}`, { word, meaning })
            : axios.post(`${apiUrl}/words`, { word, meaning });

        request.then(response => {
            console.log(response.data);
            setWord('');
            setMeaning('');
            setUpdateId(null);
            fetchWords();
        }).catch(error => {
            console.error(error);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`${apiUrl}/words/${id}`)
            .then(response => {
                console.log(response.data);
                fetchWords();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleUpdate = (word) => {
        setWord(word.word);
        setMeaning(word.meaning);
        setUpdateId(word.id);
    };

    return (
        <div className="container">
            <div className="search-section-form">
                <input type="text" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} className="search-input-form" />
            </div>
            <form onSubmit={handleSubmit} className="word-form">
                <label className="form-label">
                    Palavra em Inglês:
                    <input type="text" value={word} onChange={e => setWord(e.target.value)} required className="form-input" />
                </label>
                <label className="form-label">
                    Significado:
                    <input type="text" value={meaning} onChange={e => setMeaning(e.target.value)} required className="form-input" />
                </label>
                <button type="submit" className={`button ${updateId ? 'btn-act-update' : 'button'}`}>{updateId ? 'Atualizar Palavra' : 'Adicionar Palavra'}</button>
            </form>
            <table className="word-table-crud">
                <thead>
                    <tr>
                        <th>Palavra em Inglês</th>
                        <th>Significado</th>
                        <th className="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredWords.map(word => (
                        <tr key={word.id}>
                            <td>{word.word}</td>
                            <td>{word.meaning}</td>
                            <td>
                                <button onClick={() => handleUpdate(word)} className="button btn-action btn-act-update">Atualizar</button>
                                <button onClick={() => handleDelete(word.id)} className="button btn-action btn-act-delete">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WordsForm;