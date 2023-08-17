class DropAmountFromBudgets < ActiveRecord::Migration[6.1]
  def change
    remove_column :budgets, :amount
  end
end
