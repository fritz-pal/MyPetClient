import React, { useState } from 'react';
import './css/AdminAddSpecies.css';
import { useFetch } from '../hooks/useFetch';
import { Genus } from '../models/Genus';
import { API_BASE_URL } from '../constants';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import postData from '../hooks/postData';
import { newSpecies } from '../models/Species';

const AdminAddSpecies: React.FC = () => {
    const [genusName, setGenusName] = useState('');
    const [genusSpecies, setGenusSpecies] = useState('');
    const [raceName, setRaceName] = useState('');
    const [t, _] = useTranslation("admin");

    const { data, loading, error } = useFetch<Array<Genus>>(API_BASE_URL + "/genus");
    let genuses: Array<string> = [];
    if (data != null) {
        data.forEach(element => {
            genuses.push(element.name)
        });
    }
    let creatingSpecies = newSpecies();

    const getSelectedGenus = () => {
        if (data != null) {
            data.forEach(element => {
                if (element.name === genusSpecies) {
                    console.log(element);
                    creatingSpecies.genus = element;
                }
            });
        }
    }

    const handleGenusSubmit = () => {
        const newGenus = {
            id: "0",
            name: genusName,
        };
        postData(API_BASE_URL + "/genus", newGenus);
        genuses.push(genusName);
        setGenusName('');
    };

    const handleSpeciesSubmit = () => {
        getSelectedGenus();
        if (creatingSpecies.genus.name === '') {
            console.log("Genus not selected");
            return;
        }
        creatingSpecies.race = raceName;

        postData(API_BASE_URL + "/species", creatingSpecies);
        setRaceName('');
        creatingSpecies = newSpecies();
    };

    return (
        <>
            {loading && <div className='load'><Loader /></div>}
            {!loading && error && <>Error</>}
            {!loading && !error && data != null &&
                <div>
                    <h2>{t("genus")}:</h2>
                    <div className="post-form">
                        <input className="post-input" type="text" value={genusName} onChange={(e) => setGenusName(e.target.value)} />
                        <button className="post-button" onClick={handleGenusSubmit}>{t("addGenus")}</button>
                    </div>
                    <h2>{t("race")}:</h2>
                    <select className="select-genus" value={genusSpecies} onChange={(e) => setGenusSpecies(e.target.value)}>
                        <option value="">{t("selectGenus")}</option>
                        {genuses.map((genus) => (
                            <option key={genus} value={genus}>
                                {genus}
                            </option>
                        ))}
                    </select>
                    <div className="post-form">
                        <input className="post-input" type="text" value={raceName} onChange={(e) => setRaceName(e.target.value)} />
                        <button className="post-button" onClick={handleSpeciesSubmit}>{t("addSpecies")}</button>
                    </div>
                </div>}
        </>
    );
};

export default AdminAddSpecies;