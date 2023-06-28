import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageStyle.css';

function WordsForm() {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [words, setWords] = useState([]);
    const [updateId, setUpdateId] = useState(null);

    const fetchWords = () => {
        axios.get('http://localhost:3000/words')
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
            ? axios.put(`http://localhost:3000/words/${updateId}`, { word, meaning })
            : axios.post('http://localhost:3000/words', { word, meaning });

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
        axios.delete(`http://localhost:3000/words/${id}`)
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
            <form onSubmit={handleSubmit} className="word-form">
                <label className="form-label">
                    Word:
                    <input type="text" value={word} onChange={e => setWord(e.target.value)} required className="form-input" />
                </label>
                <label className="form-label">
                    Meaning:
                    <input type="text" value={meaning} onChange={e => setMeaning(e.target.value)} required className="form-input" />
                </label>
                <button type="submit" className="button">{updateId ? 'Update Word' : 'Add Word'}</button>
            </form>
            <table className="word-table-crud">
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Meaning</th>
                        <th className="actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map(word => (
                        <tr key={word.id}>
                            <td>{word.word}</td>
                            <td>{word.meaning}</td>
                            <td>
                                <button onClick={() => handleUpdate(word)} className="button btn-action">Update</button>
                                <button onClick={() => handleDelete(word.id)} className="button btn-action">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WordsForm;