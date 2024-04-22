import { useState } from 'react';
import './css/AdminAddSpecies.css';
import { Species, SpeciesAPI } from '../models/Species';
import './css/AdminAddSpecies.css';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SpeciesElement from './SpeciesElement';

/**
 * React Component that displays a Admin Page for adding a species
 */
const AdminAddSpecies = () => {
    const [speciesName, setSpeciesName] = useState('');
    const [speciesFeedback, setSpeciesFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const [t,] = useTranslation("admin");
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["species"],
        queryFn: () => SpeciesAPI.getAllSpecies()
    });

    const speciesAdd = useMutation({
        mutationFn: (species: Species) => SpeciesAPI.addSpecies(species),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["species"] });
            setShowFeedback(true);
            setSpeciesFeedback(speciesName);
            setSpeciesName('');
        },
        onError: () => {
            setShowFeedback(true);
            setSpeciesFeedback('error');
        }
    });

    const deleteSpeciesMut = useMutation({
        mutationFn: (id: number) => SpeciesAPI.deleteSpecies(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["species"]
            })
        }
    })

    const deleteSpecies = (species : Species) => {
        deleteSpeciesMut.mutate(species.id);
    }

    return (
        <div className="admin-container">
            <div className="post-form-container">
                <div className="title-admin">{t("addSpecies")}</div>
                <div className="post-form">
                    <input placeholder={t("species")} className="post-input" type="text" value={speciesName} onChange={(e) => setSpeciesName(e.target.value.trim())} />
                    <button className="post-button" onClick={() => speciesAdd.mutate({ id: 0, name: speciesName })} disabled={speciesName == ""}>{t("addSpecies")}</button>
                </div>
                <div className={`feedback ${showFeedback ? 'shown' : ''}`}>{speciesFeedback === 'error' ? t("exists") : t("addedSpecies", { species: speciesFeedback })}</div>
                <div className="species-list">
                    {query.isLoading && <div>Loading...</div>}
                    {query.isSuccess && query.data?.map(species => <SpeciesElement key={species.id} onClick={deleteSpecies} species={species} />)}
                </div>
            </div>
        </div>
    );
};

export default AdminAddSpecies;
