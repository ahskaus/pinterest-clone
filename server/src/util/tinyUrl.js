import anyBase from 'any-base';
import md5 from 'md5';

//This can be easily cracked, but
//I don't see the point in it not
//being crackable. But if required,
//the ID input can be run through a
//strong hashing algo
// --Syed

//It basically changes the base from 10 to an arbitrary base
//It doesn't include vowels, ambiguous characters like 'l' and
//a/A and v/V since our frontend code routes start with these chars
//--Syed

export default (id) => anyBase(anyBase.DEC, 'qQwZsWSdrfDtCgRyFhTGBkYHNpzcMbmKnP')(`${id}`);
