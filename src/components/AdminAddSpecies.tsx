import { useState } from 'react';
import './css/AdminAddSpecies.css';
import { Species, SpeciesAPI } from '../models/Species';
import './css/AdminAddSpecies.css';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * React Component that displays a Admin Page for adding a species
 */
const AdminAddSpecies = () => {
    const [speciesName, setSpeciesName] = useState('');

    const [t, _] = useTranslation("admin");
    const queryClient = useQueryClient();

    const speciesAdd = useMutation({
        mutationFn: (species: Species) => SpeciesAPI.addSpecies(species),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["species"]});
            // Feedback

        }
    });

    return (
        <div className="genus_main_style">
            <div className="genus_style">
                <h2 className="genus_title">{t("genus")}:</h2>
                <div className="post-form">
                    <input className="post-input" type="text" value={speciesName} onChange={(e) => setSpeciesName(e.target.value.trim())} />
                    <button className="post-button" onClick={() => speciesAdd.mutate({id: 0, name: speciesName})} disabled={speciesName == ""}>{t("addGenus")}</button>
                </div>
            </div>
        </div>
    );
};

export default AdminAddSpecies;
