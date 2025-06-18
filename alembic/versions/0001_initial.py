"""initial

Revision ID: 0001
Revises: 
Create Date: 2025-06-18 19:25:00.000000
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    applicability_enum = sa.Enum('MZ', 'WP', 'NZ', name='applicability')
    applicability_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        'categories',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String, nullable=False)
    )

    op.create_table(
        'processes',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String, nullable=False),
        sa.Column('category_id', sa.Integer, sa.ForeignKey('categories.id'), nullable=False),
        sa.Column('applicability', applicability_enum, nullable=False)
    )


def downgrade():
    op.drop_table('processes')
    op.drop_table('categories')
    applicability_enum = sa.Enum('MZ', 'WP', 'NZ', name='applicability')
    applicability_enum.drop(op.get_bind(), checkfirst=True)
