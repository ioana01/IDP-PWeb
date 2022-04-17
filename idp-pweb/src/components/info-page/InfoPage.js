import React, {useState} from 'react';
import ukraine from './undraw_ukraine.png';

export default function InfoPage() {
    const languages = {en: 'EN', ua: 'UA'};
    const [language, setLanguage] = useState(languages.en);

    return (
        <div className="flex flex-wrap flex-row">
            <img src={ukraine} alt="Logo" className="w-96"/>
            <div>
                <div>
                    <div>
                        <span>Emergency Info - FAQ</span>
                    </div>
                    <div></div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}