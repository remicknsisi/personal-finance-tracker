class BudgetSerializer < ActiveModel::Serializer
  attributes :id, :amount, :user_id

  belongs_to :user
end
