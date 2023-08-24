class TagsController < ApplicationController
    def index
        tags = Tag.all
        render json: tags, status: :ok
    end

    def create
        tag = Tag.new(tag_params)
        if tag.valid?
            tag.save
            render json: tag, status: :created
        else
            render json: { errors: tag.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        tag = Tag.find_by(id: params[:id])
        if tag
            tag.destroy
            render json: tag, status: :ok
        else
            render json: { error: "Could not find tag to delete" }, status: :not_found
        end
    end

    private

    def tag_params
        params.permit(:keyword)
    end
end