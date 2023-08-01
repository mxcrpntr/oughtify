json.user do
  json.extract! @user, :id, :email, :name, :birth_date, :queue
end