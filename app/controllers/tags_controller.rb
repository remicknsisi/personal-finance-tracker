class TagsController < ApplicationController
    def index
        user_tags = @user.tags
        if user_tags
            render json: user_tags, status: :ok
        else
            render json: { error: "Could not find tags for this user" }, status: :not_found
        end
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