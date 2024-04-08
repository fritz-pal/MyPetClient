import { useState } from 'react';
import './css/AdminAddSpecies.css';
import { Species, SpeciesAPI } from '../models/Species';
import './css/card.css';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * React Component that displays a Admin Page for adding a species
 */
const AdminAddSpecies = () => {
    const [speciesName, setSpeciesName] = useState('');
    const [speciesFeedback, setSpeciesFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    const [t,] = useTranslation("admin");
    const queryClient = useQueryClient();

    const speciesAdd = useMutation({
        mutationFn: (species: Species) => SpeciesAPI.addSpecies(species),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["species"] });
            setShowFeedback(true);
            setSpeciesFeedback(speciesName);
            setSpeciesName('');
        }
    });

    return (
        <div>
            <div className="post-form">
                <input placeholder={t("species")} className="post-input" type="text" value={speciesName} onChange={(e) => setSpeciesName(e.target.value.trim())} />
                <button className="post-button" onClick={() => speciesAdd.mutate({ id: 0, name: speciesName })} disabled={speciesName == ""}>{t("addSpecies")}</button>
            </div>
            <div className={`feedback ${showFeedback ? 'shown' : ''}`}>{t("addedSpecies", {species : speciesFeedback})}</div>
        </div>
    );
};

export default AdminAddSpecies;