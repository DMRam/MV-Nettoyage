import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sliceOnChangeLanguage } from "../store/switcher-slice";

interface UseLanguageProps {
    onChangeLanguage: (selectedLanguage: string) => void;
    languageSelected: string;
}

export const useLanguageSelector = (): UseLanguageProps => {
    const dispatch = useAppDispatch();
    const languageSelected = useAppSelector((state) => state.ui.language);

    
    const onChangeLanguage = (selectedLanguage: string) => {
        
        dispatch(sliceOnChangeLanguage(selectedLanguage));
    };
    

    return { onChangeLanguage, languageSelected };
};
