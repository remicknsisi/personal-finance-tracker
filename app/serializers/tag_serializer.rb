class TagSerializer < ActiveModel::Serializer
  attributes :id, :keyword

  has_many :transactions
  # has_many :budgets
end
