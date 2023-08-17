class AddAmountToBudgets < ActiveRecord::Migration[6.1]
  def change
    add_column :budgets, :amount, :integer
  end
end
