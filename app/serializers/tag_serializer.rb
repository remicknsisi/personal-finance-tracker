class TagSerializer < ActiveModel::Serializer
  attributes :id, :keyword, :budget_id

  has_many :transactions
  belongs_to :budget
end
