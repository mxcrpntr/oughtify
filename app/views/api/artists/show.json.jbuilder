json.artist do
  json.extract! @artist, :id, :name, :bio, :created_at, :updated_at
end