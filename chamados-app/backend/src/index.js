const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());

app.post('/api/tickets', async (req, res) => {
  const { title, description, equipment, priority, requester_id } = req.body;
  try {
    const ticket = await prisma.ticket.create({
      data: { title, description, equipment, priority, requesterId: requester_id }
    });
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar ticket' });
  }
});

app.get('/api/tickets', async (req, res) => {
  const { status, priority, q } = req.query;
  const where = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (q) where.OR = [
    { title: { contains: q, mode: 'insensitive' } },
    { description: { contains: q, mode: 'insensitive' } }
  ];
  try {
    const tickets = await prisma.ticket.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar tickets' });
  }
});

app.get('/api/tickets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
      include: { comments: true }
    });
    if (!ticket) return res.status(404).json({ error: 'Ticket não encontrado' });
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar ticket' });
  }
});

app.post('/api/tickets/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { userId, content } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { ticketId: Number(id), userId, content }
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));