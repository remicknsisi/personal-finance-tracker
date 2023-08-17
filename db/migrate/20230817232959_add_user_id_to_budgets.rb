class AddUserIdToBudgets < ActiveRecord::Migration[6.1]
  def change
    add_column :budgets, :user_id, :integer
  end
end
