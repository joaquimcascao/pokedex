import { Router } from 'express';
import { getPokemon } from '../controllers/pokemonController.js';

const router = Router();

router.post('/pokemon', getPokemon);
router.all('/keepalive', (req, res) => res.status(200).send('OK'));

export default router;