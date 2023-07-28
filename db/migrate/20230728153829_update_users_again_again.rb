class UpdateUsersAgainAgain < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :queue, :text, array: true, null: false, default: []
  end
end
