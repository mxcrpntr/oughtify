json.user do
  json.extract! @user, :id, :email, :name, :birth_date, :created_at, :updated_at
end