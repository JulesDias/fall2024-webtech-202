"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../components/UserContext";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from 'next/navigation';
import RichTextEditor from "../../components/RichTextEditor";

export default function Profile() {
    const { user, logout } = useUser();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);
    const router = useRouter();

    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("author_id", user.id);

        if (error) {
            console.error("Error fetching articles:", error.message);
            return;
        }
        setArticles(data);
    };

    useEffect(() => {
        if (user) {
            fetchArticles();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-gray-800 dark:text-gray-200">
                <h1 className="text-2xl font-semibold">No user connected</h1>
                <p className="mt-2">Connect to access your Profile</p>
            </div>
        );
    }

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);

        try {
            if (editingArticle) {
                const { error } = await supabase
                    .from("posts")
                    .update({
                        title,
                        content,
                        tags,
                        is_published: isPublished,
                    })
                    .eq("id", editingArticle.id);

                if (error) throw error;

                alert("Article updated successfully!");
            } else {
                const { error } = await supabase.from("posts").insert([{
                    title,
                    content,
                    tags,
                    is_published: isPublished,
                    author_id: user.id,
                }]);

                if (error) throw error;

                alert("Article created successfully!");
            }

            setShowCreateForm(false);
            setTitle("");
            setContent("");
            setTags("");
            setIsPublished(false);
            setEditingArticle(null);
            fetchArticles();
        } catch (error) {
            console.error("Error creating or updating the article:", error.message);
            alert("Error saving the article.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowCreateForm(false);
        setTitle("");
        setContent("");
        setTags("");
        setIsPublished(false);
        setEditingArticle(null);
    };

    const handleEditPost = (article) => {
        setEditingArticle(article);
        setTitle(article.title);
        setContent(article.content);
        setTags(article.tags);
        setIsPublished(article.is_published);
        setShowCreateForm(true);
    };

    const handleDeletePost = async (articleId) => {
        if (confirm("Are you sure you want to delete this article?")) {
            setLoading(true);
            try {
                const { error } = await supabase
                    .from("posts")
                    .delete()
                    .eq("id", articleId);

                if (error) throw error;

                alert("Article successfully deleted!");
                fetchArticles();
            } catch (error) {
                console.error("Error deleting the article:", error.message);
                alert("Error deleting the article.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div className="relative w-full max-w-2xl p-8 mx-auto mt-8 bg-white rounded-lg shadow-md dark:bg-gray-800 font-FS_Sinclair">
            <div className="flex justify-center mb-6">
                <img
                    src={user.avatar_url}
                    alt="Profile picture"
                    className="object-cover w-24 h-24 border-4 border-gray-300 rounded-full dark:border-gray-700"
                />
            </div>

            <h2 className="mb-1 text-2xl font-semibold text-center">{user.name}</h2>
            <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-400">{user.email}</p>

            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-6 py-3 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600">
                    Write an article
                </button>
            </div>

            {/* Modal for creating/editing article */}
            {showCreateForm && (
                <>
                    <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />
                    <div className="fixed inset-0 z-20 flex items-center justify-center">
                        <form onSubmit={handleCreatePost} className="p-8 space-y-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 w-96">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Article title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="block w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Article content
                                </label>
                                {/* RichTextEditor replaces the textarea */}
                                <RichTextEditor content={content} setContent={setContent} />
                            </div>
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tags (separated with commas)
                                </label>
                                <input
                                    id="tags"
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="block w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Publish
                                </label>
                                <input
                                    type="checkbox"
                                    checked={isPublished}
                                    onChange={(e) => setIsPublished(e.target.checked)}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-3 text-white bg-gray-400 rounded-lg shadow hover:bg-gray-500">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-6 py-3 ${loading ? "bg-gray-400" : "bg-indigo-600"} text-white rounded-lg shadow hover:bg-indigo-700`}
                                    disabled={loading}>
                                    {loading ? "Submitting..." : editingArticle ? "Update article" : "Publish article"}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold text-center">Your Articles</h3>
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className="p-4 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                            <h4 className="text-lg font-semibold">{article.title}</h4>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() => handleEditPost(article)}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePost(article.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400">No articles yet.</p>
                )}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={handleLogout}
                    className="px-6 py-3 text-white bg-red-500 rounded-md shadow hover:bg-red-600">
                    Disconnect
                </button>
            </div>
        </div>
    );
}
