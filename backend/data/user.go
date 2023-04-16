package data

type User struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	DateCreated string `json:"date_created,omitempty"`
	SourceType  string `json:"source_type,omitempty"`
}

func (user *User) create() {

}
