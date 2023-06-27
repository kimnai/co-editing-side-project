package data

type User struct {
	UserName    string `json:"username,omitempty"`
	Email       string `json:"email,omitempty"`
	Password    string `json:"password,omitempty"`
	DateCreated string `json:"date_created,omitempty"`
	Source      string `json:"source,omitempty"`
}

func (user *User) CheckCreate() bool {
	if user.UserName == "" {
		return false
	}

	if user.Email == "" {
		return false
	}

	if user.Source != "FirstParty" && user.Source != "Google" {
		return false
	}

	if user.Source == "FirstParty" && user.Password == "" {
		return false
	}

	return true
}

func (user *User) CheckLogin() bool {
	if user.Email == "" {
		return false
	}

	if user.Source != "FirstParty" && user.Source != "Google" {
		return false
	}

	if user.Source == "FirstParty" && user.Password == "" {
		return false
	}

	return true
}
