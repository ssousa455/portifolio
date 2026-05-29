import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Loader2, AlertCircle, MessageSquare, User, Calendar, ExternalLink } from 'lucide-react';
import { triggerToast } from './CmsToaster';
import { githubApi } from '../../lib/adminApi';

export default function Messages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState<number | null>(null);

    useEffect(() => {
        loadMessages();
    }, []);

    async function loadMessages() {
        setLoading(true);
        setError('');
        try {
            const data = await githubApi('read', 'src/data/contactMessages.json');
            setMessages(data.content ? JSON.parse(data.content) : []);
        } catch (err: any) {
            if (err.message.includes('404') || err.message.includes('Not Found')) {
                setMessages([]);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        setDeleting(id);
        try {
            const updated = messages.filter(m => m.id !== id);
            const data = await githubApi('read', 'src/data/contactMessages.json');
            await githubApi('write', 'src/data/contactMessages.json', {
                content: JSON.stringify(updated, null, 2),
                sha: data.sha,
                message: `CMS: deleted message #${id}`
            });
            setMessages(updated);
            triggerToast('Mensagem removida.', 'success');
        } catch (err: any) {
            triggerToast(`Erro: ${err.message}`, 'error');
        } finally {
            setDeleting(null);
        }
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 text-slate-400 bg-white rounded-2xl border border-slate-200">
            <Mail className="w-10 h-10 animate-pulse mb-6 text-slate-300" />
            <p className="font-semibold text-sm animate-pulse text-slate-500">Carregando mensagens...</p>
        </div>
    );

    if (error) return (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={loadMessages} className="mt-4 text-sm text-violet-600 hover:text-violet-700 font-medium">Tentar novamente</button>
        </div>
    );

    const cardClass = "bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden";

    return (
        <div className="max-w-5xl pb-32">
            <div className="flex items-center justify-between bg-white p-4 px-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Mensagens de Contato</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {messages.length} mensagem{messages.length !== 1 ? 'ns' : ''} recebida{messages.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
                    <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">Nenhuma mensagem recebida ainda.</p>
                    <p className="text-xs text-slate-400 mt-1">As mensagens enviadas pelo formulário de contato aparecerão aqui.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.slice().reverse().map(msg => (
                        <div key={msg.id} className={cardClass}>
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                                                <User className="w-3.5 h-3.5 text-slate-400" />
                                                {msg.name}
                                            </span>
                                            <a href={`mailto:${msg.email}`}
                                               className="inline-flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium">
                                                <Mail className="w-3 h-3" />
                                                {msg.email}
                                            </a>
                                        </div>
                                        {msg.subject && (
                                            <p className="text-sm font-semibold text-slate-700 mb-2">
                                                <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                                                {msg.subject}
                                            </p>
                                        )}
                                        <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                                        <div className="flex items-center gap-2 mt-4">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <span className="text-xs text-slate-400">
                                                {new Date(msg.receivedAt).toLocaleString('pt-BR')}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        disabled={deleting === msg.id}
                                        className="shrink-0 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                                        title="Remover mensagem"
                                    >
                                        {deleting === msg.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
