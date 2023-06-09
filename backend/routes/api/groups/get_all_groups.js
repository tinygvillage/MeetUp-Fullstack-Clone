const router = require('express').Router();
const { Group, Membership, GroupImage } = require('../../../db/models');
const { formatGroup } = require('../../../utils/formatGroup');

router.get('/', async (_req, res, next) => {

    const groups = await Group.unscoped().findAll({
        include: [{ model: Membership }, { model: GroupImage, attributes: ["url"] }]
    });

    if (!groups) next(err);

    const groupInfo = formatGroup(groups);

    return res.status(200).json({ "Groups": groupInfo });
});


module.exports = router;
