export interface UserInterface{ 
    id?:             number;
    uid?:            string;
    name?:           string;
    email?:          string;
    age?:            number;
    image_name_ext?: string;

    pass_original?:  string;
    pass_encrypted?: string;
    token?:          string;

    date_created?:   string;
    date_updated?:   string;
}

