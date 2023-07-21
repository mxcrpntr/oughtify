class ChangeUserBirthdate < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :birth_date, :string
  end
end
